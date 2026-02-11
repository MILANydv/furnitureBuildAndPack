import { NextRequest, NextResponse } from 'next/server';
import { ConfiguratorService } from '@/server/modules/configurator/configurator.service';
import { z } from 'zod';

const configuratorService = new ConfiguratorService();

const calculatePriceSchema = z.object({
  productId: z.string(),
  length: z.number().positive().optional(),
  width: z.number().positive().optional(),
  height: z.number().positive().optional(),
  frameType: z.string().optional(),
  legType: z.string().optional(),
  tabletopType: z.string().optional(),
  finish: z.string().optional(),
  material: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = calculatePriceSchema.parse(body);

    const result = await configuratorService.calculatePrice({
      productId: validated.productId,
      length: validated.length,
      width: validated.width,
      height: validated.height,
      frameType: validated.frameType,
      legType: validated.legType,
      tabletopType: validated.tabletopType,
      finish: validated.finish,
      material: validated.material,
    });

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }
    console.error('Error calculating price:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to calculate price' },
      { status: 500 }
    );
  }
}
