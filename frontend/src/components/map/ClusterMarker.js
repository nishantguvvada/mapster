'use client';

export default function ClusterMarker({ cluster, onClick }) {
  const { point_count: pointCount } = cluster.properties;
  
  return (
    <Marker
      latitude={cluster.geometry.coordinates[1]}
      longitude={cluster.geometry.coordinates[0]}
    >
      <div 
        className="cluster-marker bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold"
        onClick={onClick}
      >
        {pointCount}
      </div>
    </Marker>
  );
}