import Vue from "vue";
import Router from "vue-router";

import BatchList from "@/components/BatchList";
import ViewBatch from "@/components/ViewBatch";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Root",
      components: {
        default: BatchList,
      },
    },
    {
      path: "/batch/:id",
      name: "Batch",
      components: {
        default: ViewBatch,
      },
    },
  ],
});

export default router;
