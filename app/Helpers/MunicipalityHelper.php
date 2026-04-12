<?php

namespace App\Helpers;

use Illuminate\Support\Facades\DB;

class MunicipalityHelper
{
    /**
     * Calculate delivery fee based on Miller's settings and distance between municipalities.
     */
    public static function calculateFee($millerId, $retailerMunicipalityId)
    {
        $settings = DB::table('miller_delivery_settings')
            ->where('miller_id', $millerId)
            ->first();

        if (!$settings) {
            return 150.00; // Default fallback
        }

        $millerMun = DB::table('municipalities')
            ->where('id', $settings->municipality_id)
            ->first();

        $retailerMun = DB::table('municipalities')
            ->where('id', $retailerMunicipalityId)
            ->first();

        if (!$millerMun || !$retailerMun) {
            return (float) $settings->base_delivery_fee;
        }

        $distance = abs($millerMun->distance_index - $retailerMun->distance_index);

        if ($distance === 0) {
            return 0.00;
        }

        if ($distance === 1) {
            return (float) $settings->base_delivery_fee;
        }

        return (float) $settings->base_delivery_fee + (($distance - 1) * (float) $settings->extra_fee_per_municipality);
    }
}
