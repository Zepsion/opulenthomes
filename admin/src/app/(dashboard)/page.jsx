"use client";

import { useMemo } from "react";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import {
  HiOutlineOfficeBuilding,
  HiOutlineUserGroup,
  HiOutlineLocationMarker,
  HiOutlineInboxIn,
} from "react-icons/hi";
import { useFetch } from "@hooks/useFetch.js";
import { getProperties } from "@services/property.service.js";
import { getBuilders } from "@services/builder.service.js";
import { getLocations } from "@services/location.service.js";
import { getLeads } from "@services/lead.service.js";
import PageHeader from "@components/common/PageHeader.jsx";
import Loader from "@components/common/Loader.jsx";
import Badge from "@components/common/Badge.jsx";
import { formatDate } from "@lib/formatters.js";

const STATUS_TONES = {
  new: "blue",
  contacted: "gold",
  qualified: "gold",
  negotiation: "gold",
  converted: "green",
  lost: "red",
};

const StatCard = ({ icon: Icon, label, value, isLoading, href }) => (
  <Link href={href} className="flex items-center gap-4 rounded-2xl border border-charcoal-100 bg-white p-6 transition-shadow hover:shadow-card">
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-50 text-xl text-gold-700">
      <Icon />
    </div>
    <div>
      <p className="font-display text-2xl text-charcoal-900">{isLoading ? "…" : value ?? 0}</p>
      <p className="text-xs uppercase tracking-widest2 text-charcoal-500">{label}</p>
    </div>
  </Link>
);

export default function DashboardPage() {
  const properties = useFetch(() => getProperties({ limit: 1 }), []);
  const builders = useFetch(() => getBuilders({ limit: 1 }), []);
  const locations = useFetch(() => getLocations({ limit: 1 }), []);
  const recentLeads = useFetch(() => getLeads({ limit: 6 }), []);
  const allLeads = useFetch(() => getLeads({ limit: 100 }), []);

  const chartData = useMemo(() => {
    if (!allLeads.data) return [];
    const counts = allLeads.data.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([status, count]) => ({
      status: status.charAt(0).toUpperCase() + status.slice(1),
      count,
    }));
  }, [allLeads.data]);

  return (
    <div>
      <PageHeader title="Dashboard" description="A snapshot of Opulent Homes right now." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={HiOutlineOfficeBuilding} label="Properties" value={properties.meta?.totalItems} isLoading={properties.isLoading} href="/properties" />
        <StatCard icon={HiOutlineUserGroup} label="Builders" value={builders.meta?.totalItems} isLoading={builders.isLoading} href="/builders" />
        <StatCard icon={HiOutlineLocationMarker} label="Locations" value={locations.meta?.totalItems} isLoading={locations.isLoading} href="/locations" />
        <StatCard icon={HiOutlineInboxIn} label="Leads" value={recentLeads.meta?.totalItems} isLoading={recentLeads.isLoading} href="/leads" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-charcoal-100 bg-white p-6">
          <h3 className="mb-6 font-display text-lg text-charcoal-900">Leads by Status</h3>
          {allLeads.isLoading ? (
            <Loader label="Loading chart" />
          ) : chartData.length === 0 ? (
            <p className="py-10 text-center text-sm text-charcoal-500">No leads yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                <XAxis dataKey="status" tick={{ fontSize: 12 }} stroke="#a1a1aa" />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} stroke="#a1a1aa" />
                <Tooltip cursor={{ fill: "#fbf7ed" }} />
                <Bar dataKey="count" fill="#c9a24d" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="rounded-2xl border border-charcoal-100 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg text-charcoal-900">Recent Leads</h3>
            <Link href="/leads" className="text-xs uppercase tracking-widest2 text-gold-700 hover:text-gold-500">View All</Link>
          </div>

          {recentLeads.isLoading ? (
            <Loader label="Loading leads" />
          ) : recentLeads.data?.length === 0 ? (
            <p className="py-10 text-center text-sm text-charcoal-500">No leads yet.</p>
          ) : (
            <div className="flex flex-col divide-y divide-charcoal-100">
              {recentLeads.data?.map((lead) => (
                <div key={lead._id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-charcoal-900">{lead.name}</p>
                    <p className="text-xs text-charcoal-500">{formatDate(lead.createdAt)}</p>
                  </div>
                  <Badge tone={STATUS_TONES[lead.status] || "gray"}>{lead.status}</Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
