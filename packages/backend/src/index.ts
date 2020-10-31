import "reflect-metadata";
import koa from "koa";
import session from "koa-session";
import bodyParser from "koa-bodyparser";
import resolvers from "./resolvers/index";
import cors from "@koa/cors";
import redisStore from "koa-redis";
import redis from "./redis";
import { createConnection, getConnection } from "typeorm";
import { ApolloServer } from "apollo-server-koa";
import { buildSchema } from "type-graphql";
import { ApolloServerLoaderPlugin } from "type-graphql-dataloader";
import { User } from "./entities/User";
import { Session } from "./types";

const app = new koa();
app.keys = ["change"];
const CONFIG = {
  key: "CHANGE LATER",
  maxAge: 86400000 * 14,
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: true,
  renew: false,
  store: redisStore({
    client: redis,
  }),
};

app.use(session(CONFIG, app));
app.use(
  cors({
    credentials: true,
  })
);
app.use(bodyParser());

const main = async () => {
  const connection = await createConnection(require("../ormconfig.js"));

  const schema = await buildSchema({
    //@ts-ignore
    resolvers,
    emitSchemaFile: true,
    authChecker: ({ context }, roles) => {
      if (!context.user) {
        return false;
      }

      //todo implement roles
      if(roles.includes({})){
          return true;
      }
      return true;
    },
  });

  const server = new ApolloServer({
    schema,
    context: ({ ctx, connection }) => {
      if (connection?.context) {
        return connection.context;
      }

      return {
        user: ctx.user,
        session: ctx.session,
        cookies: ctx.cookies,
        destroy() {
            ctx.session = null;
        }
      };
    },
    debug: true,
    uploads: true,
    plugins: [
      ApolloServerLoaderPlugin({
        typeormGetConnection: getConnection,
      }),
    ],
  });

  app.use((ctx, next) => {
    ctx.connection = connection;
    return next();
  });
  app.use(async (ctx: koa.ParameterizedContext & {session: Session}, next) => {
    ctx.user = await User.fromSession(ctx.session);
    return next();
  });
  server.applyMiddleware({ app, path: "/api/graphql" });
  app.listen(5000, () => {
    console.log("we live");
  });
};

main().catch(e => console.log(e));
