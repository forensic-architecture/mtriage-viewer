import Vue from "vue";
import Router from "vue-router";

import Landing from "@/components/Landing";
// import BatchList from "@/components/BatchList";
import ViewBatch from "@/components/ViewBatch";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "root",
      components: {
        // default: BatchList,
        default: Landing,
      },
    },
    {
      path: "/batch/:id",
      name: "batch",
      components: {
        default: ViewBatch,
      },
    },
    {
      path: "*",
      redirect: (to) => {
        return {
          name: "root",
        };
      },
    },
  ],
});

export default router;
