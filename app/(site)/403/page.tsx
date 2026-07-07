import type { Metadata } from "next";
import Forbidden403Client from "./Forbidden403Client";

export const metadata: Metadata = {
  title: "403 Forbidden",
  robots: { index: false, follow: false },
};

export default Forbidden403Client;
