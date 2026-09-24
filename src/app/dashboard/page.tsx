"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useRoute } from "@/hooks/useRoute";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { MapPanel } from "@/components/layout/MapPanel";
import { QueryInput } from "@/components/route/QueryInput";
import { RouteSummary } from "@/components/route/RouteSummary";
import { RouteTimeline } from "@/components/route/RouteTimeline";
import { BikeStationList } from "@/components/route/BikeStationList";
import { EmptyState } from "@/components/route/EmptyState";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";

export default function DashboardPage() {
  const router = useRouter();
  const { token, isAuthenticated, logout, role } = useAuth();
  const { state, result, error, meta, planRoute, reset } = useRoute();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (state === "error" && error) {
      toast.error("Route planning failed", {
        description: error,
        duration: 6000,
      });
    }
  }, [state, error]);

  const handleQuery = (query: string) => {
    if (!token) {
      router.push("/login");
      return;
    }
    planRoute(query, token);
  };

  const handleLogout = () => {
    logout();
    reset();
    router.push("/login");
  };

  if (!isAuthenticated) return null;

  return (
    <div className="h-screen flex flex-col bg-zinc-950 overflow-hidden">
      <Navbar
        model={meta?.model}
        cached={meta?.cached}
        onLogout={handleLogout}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar>
          {/* Query section */}
          <div>
            <QueryInput
              onSubmit={handleQuery}
              isLoading={state === "loading"}
            />
          </div>

          {/* Divider */}
          {state !== "idle" && (
            <div className="border-t border-zinc-800/60" />
          )}

          {/* Results section */}
          {state === "loading" && <LoadingSkeleton />}

          {state === "success" && result && (
            <div>
              <RouteSummary result={result} />
              <RouteTimeline legs={result.legs} />
              {result.bikeOptions && result.bikeOptions.length > 0 && (
                <BikeStationList options={result.bikeOptions} />
              )}
            </div>
          )}

          {state === "idle" && <EmptyState />}
        </Sidebar>

        <MapPanel result={state === "success" ? result : null} />
      </div>
    </div>
  );
}
