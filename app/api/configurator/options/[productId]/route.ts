import { NextRequest, NextResponse } from 'next/server';
import { ConfiguratorService } from '@/server/modules/configurator/configurator.service';

const configuratorService = new ConfiguratorService();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    const options = await configuratorService.getAvailableOptions(productId);
    return NextResponse.json(options);
  } catch (error) {
    console.error('Error fetching configurator options:', error);
    return NextResponse.json(
      { error: 'Failed to fetch options' },
      { status: 500 }
    );
  }
}
