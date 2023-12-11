import swaggerJSDoc from "swagger-jsdoc";

const userSwagger = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0.0",
      description: "API documentation for the User API",
    },
  },
  apis: ["./routes/user.routes.js"],
};
const postSwagger = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Post API",
      version: "1.0.0",
      description: "API documentation for the Post API",
    },
  },
  apis: ["./routes/post.routes.js"],
};
const commentSwagger = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Comment API",
      version: "1.0.0",
      description: "API documentation for the Comment API",
    },
  },
  apis: ["./routes/comment.routes.js"],
};
const chatSwagger = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Chat API",
      version: "1.0.0",
      description: "API documentation for the Chat API",
    },
  },
  apis: ["./routes/chat.routes.js"],
};
const swaggerSpecUser = swaggerJSDoc(userSwagger);
const swaggerSpecPost = swaggerJSDoc(postSwagger);
const swaggerSpecComment = swaggerJSDoc(commentSwagger);
const swaggerSpecChat = swaggerJSDoc(chatSwagger);

export {
  swaggerSpecUser,
  swaggerSpecPost,
  swaggerSpecComment,
  swaggerSpecChat,
};
