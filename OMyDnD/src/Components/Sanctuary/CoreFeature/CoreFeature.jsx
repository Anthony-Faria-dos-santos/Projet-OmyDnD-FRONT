import { useParams } from 'react-router-dom';
import CoreFeatureRace from "./CoreFeatureRace";
import CoreFeatureClass from "./CoreFeatureClass";

function CoreFeature() {
  const { featureType } = useParams();

  switch (featureType) {
    case 'races':
      return <CoreFeatureRace />;
    case 'classes':
      return <CoreFeatureClass />;
    default:
      return <div>Feature not found</div>;
  }
}

export default CoreFeature;