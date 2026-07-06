import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { customers } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  const data = await db.select().from(customers).orderBy(desc(customers.id));
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const [item] = await db
      .insert(customers)
      .values({
        name: body.name,
        phone: body.phone || null,
        address: body.address || null,
        balance: body.balance || "0",
      })
      .returning();
    return NextResponse.json(item);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const [item] = await db
      .update(customers)
      .set({
        name: body.name,
        phone: body.phone,
        address: body.address,
        balance: body.balance,
      })
      .where(eq(customers.id, body.id))
      .returning();
    return NextResponse.json(item);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}
