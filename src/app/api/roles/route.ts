import { NextResponse } from "next/server";
import { getRoles, getCompetenciesByRoleSlug } from "@/lib/roles";

export async function GET() {
  const roles = getRoles();
  const rolesWithCompetencies = roles.map((role) => ({
    ...role,
    competencies: getCompetenciesByRoleSlug(role.slug),
    has_rapor_bank: ["software-engineer", "data-analyst", "uiux-designer", "network-engineer", "quality-assurance"].includes(role.slug),
  }));

  return NextResponse.json({
    success: true,
    data: rolesWithCompetencies,
    roles: rolesWithCompetencies,
  });
}
