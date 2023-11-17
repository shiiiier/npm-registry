
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


interface PackageDetailsProps {
    
  }

  interface VersionDetails {
    version: string | any;
    name: string;
    description: string;
    author: {
      name: string;
      email: string;
    };
    homepage: string;
    repository: {
      type: string;
      url: string;
    };
    main: string;
    keywords: string[];
  }

const PackageDetailsPage: React.FC<PackageDetailsProps> = () => {

    const { packageName } = useParams();
    const [ packageDetails, setPackageDetails ] = useState<VersionDetails | null>(null);

    useEffect( () => {
        const fetchPackageDetails = async () => {
            try {
                const response = await axios.get(`https://registry.npmjs.org/${packageName}`);
                const packageData= response.data;

                // Extract details from the first version
                const versions = packageData.versions;
                const versionKeys = Object.keys(versions);
                const firstVersionKey = versionKeys.length > 0 ? versionKeys[0] : null;
                const firstVersionDetails = firstVersionKey ? versions[firstVersionKey] : null;

                if (firstVersionDetails) {
                    const detailsToDisplay: VersionDetails = {
                      version: firstVersionKey || null,
                      name: packageData.name,
                      description: firstVersionDetails.description,
                      author: {
                        name: firstVersionDetails.author?.name || '',
                        email: firstVersionDetails.author?.email || '',
                      },
                      homepage: firstVersionDetails.homepage || '',
                      repository: {
                        type: firstVersionDetails.repository?.type || '',
                        url: firstVersionDetails.repository?.url || '',
                      },
                      main: firstVersionDetails.main || '',
                      keywords: firstVersionDetails.keywords || [],
                    };
          
                    setPackageDetails(detailsToDisplay);
                  }
                  
            } catch (error) {
                console.error('Error fetching package details', error);
            }
        }

        fetchPackageDetails();

    }, [packageName]);

    return (
        <div>

            <Link to={"/"}>
                <button>Back</button>
            </Link>

            { packageDetails ? (
                <div>
                    <h1>Details for {packageName}</h1>
                    <p>Version: {packageDetails.version || 'N/A'}</p>
                    <p>Name: {packageDetails.name}</p>
                    <p>Description: {packageDetails.description}</p>
                    <p>Author: {packageDetails.author.name} ({packageDetails.author.email})</p>
                    <p>Homepage: <a href={packageDetails.homepage} target="_blank" rel="noopener noreferrer">{packageDetails.homepage}</a></p>
                    <p>Repository Type: {packageDetails.repository.type}</p>
                    <p>Repository URL: {packageDetails.repository.url}</p>
                    <p>Main: {packageDetails.main}</p>
                    <p>Keywords: {packageDetails.keywords.join(', ')}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PackageDetailsPage