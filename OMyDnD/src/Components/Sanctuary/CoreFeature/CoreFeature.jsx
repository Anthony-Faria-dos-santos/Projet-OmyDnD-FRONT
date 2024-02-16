import { useParams } from 'react-router-dom';
import CoreFeatureRace from "./CoreFeatureRace";
import CoreFeatureClass from "./CoreFeatureClass";
import CoreFeatureBackground from "./CoreFeatureBackground";

function CoreFeature() {
  const { featureType } = useParams();

  switch (featureType) {
    case 'races':
      return <CoreFeatureRace />;
    case 'classes':
      return <CoreFeatureClass />;
    case 'backgrounds':
      return <CoreFeatureBackground />;
    default:
      return <div>Feature not found</div>;
  }
}

export default CoreFeature;