"use client";
import { useContext } from "react";

import dynamic from "next/dynamic";

import { Footer } from "@components/Footer";
import LeftMapInfoCard from "@components/LeftInfoCard";
import RightMapInfoCard from "@components/RightMapInfoCard";

// Fix for "window is not defined" error during server-side rendering
const MapSection = dynamic(() => import("@components/Map"), { ssr: false });

export default function Home() {
  return (
    <>
      <div className="relative h-screen">
        <div className="fixed inset-0 z-0">
          <MapSection />
        </div>
        <LeftMapInfoCard />
        <RightMapInfoCard />
        <Footer />
      </div>
    </>
  );
}
