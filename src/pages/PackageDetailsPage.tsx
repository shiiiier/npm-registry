import React from "react";
import { useParams } from 'react-router-dom';

interface PackageDetailsProps {
    
  }

const PackageDetailsPage: React.FC<PackageDetailsProps> = () => {

    const { packageName } = useParams();

    return (
        <div>
            <h1>Details for {packageName}</h1>
        </div>
    );
};

export default PackageDetailsPage