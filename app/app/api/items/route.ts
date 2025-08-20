import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const data = await req.json();

  // Vérifie si le lieu existe déjà, sinon le crée
  const location = await prisma.location.upsert({
    where: { name: data.locationName },
    create: { name: data.locationName },
    update: {},
  });

  // Crée un item avec une inspection liée
  const item = await prisma.item.create({
    data: {
      locationId: location.id,
      label: data.label,
      type: data.type ?? null,
      serial: data.serial ?? null,
      inspections: {
        create: {
          inspector: data.inspector,
          status: data.status,
          notes: data.notes ?? null,
        },
      },
    },
    include: { inspections: true, location: true },
  });

  return NextResponse.json({ ok: true, item });
}
