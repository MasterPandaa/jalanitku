import rolesData from "@/data/seed/roles.json";
import competenciesData from "@/data/seed/competencies.json";

export interface Role {
  id: string;
  slug: string;
  nama: { id: string; en?: string };
  julukan: string;
  tagline: { id: string; en?: string };
  deskripsi: { id: string; en?: string };
  warna: string;
  mascot_key: string;
  urutan: number;
  aktif: boolean;
}

export interface Competency {
  id: string;
  role_slug: string;
  nama: { id: string; en?: string };
  urutan: number;
}

export function getRoles(): Role[] {
  return (rolesData as Role[]).filter((r) => r.aktif);
}

export function getRoleBySlug(slug: string): Role | undefined {
  return (rolesData as Role[]).find((r) => r.slug === slug);
}

export function getCompetenciesByRoleSlug(roleSlug: string): Competency[] {
  return (competenciesData as Competency[])
    .filter((c) => c.role_slug === roleSlug)
    .sort((a, b) => a.urutan - b.urutan);
}

export function getAllCompetencies(): Competency[] {
  return competenciesData as Competency[];
}
