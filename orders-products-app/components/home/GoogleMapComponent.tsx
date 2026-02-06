"use client";

import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useLocale } from "@/contexts/LocaleContext";

const KYIV_CENTER = { lat: 50.4501, lng: 30.5234 };
const KYIV_MARKER = { lat: 50.44704, lng: 30.52327 };

export default function GoogleMapComponent() {
  const { t } = useLocale();
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
  if (!apiKey) {
    return (
      <div className="card h-100">
        <div className="card-body d-flex align-items-center justify-content-center text-muted">
          <span>{t("map.keyMissing")}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card h-100 overflow-hidden">
      <div className="card-header bg-white border-bottom fw-semibold">
        {t("map.title")}
      </div>
      <div
        className="card-body p-0"
        style={{ height: "400px", minHeight: "400px" }}
      >
        <APIProvider apiKey={apiKey}>
          <Map
            defaultCenter={KYIV_CENTER}
            defaultZoom={14}
            gestureHandling="greedy"
            disableDefaultUI={false}
            style={{ width: "100%", height: "100%" }}
          >
            <Marker position={KYIV_MARKER} title={t("map.markerTitle")} />
          </Map>
        </APIProvider>
      </div>
    </div>
  );
}
