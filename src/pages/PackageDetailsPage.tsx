
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { ProgressBar } from "react-loader-spinner";

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

    const { packageName } = (useParams<{ packageName: string }>());

    console.log(packageName)

    const decodedPackageName = decodeURIComponent(packageName!)

    console.log(decodedPackageName)

    const [ packageDetails, setPackageDetails ] = useState<VersionDetails | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    // const location = useLocation();

    const handleButtonClick = () => {
      // Navigate back to the home page
      navigate('/');
    };
  
    useEffect( () => {
        const fetchPackageDetails = async () => {
            try {
                const response = await axios.get(`https://registry.npmjs.org/${decodedPackageName}`);
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
            } finally {
              setIsLoading(false);
            }
        }

        fetchPackageDetails();

    }, [packageName]);

    return (
        <>
        <div className="detailsPageContainer">
        { isLoading? (
            <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{
              margin: 'auto', // Center horizontally
              display: 'flex', // Center horizontally and vertically
              justifyContent: 'center', // Center horizontally
              alignItems: 'center', // Center vertically
            }}
            wrapperClass="progress-bar-wrapper"
            borderColor="#008000"
            barColor="#d0f5cb"
          />
        ) : packageDetails ? (
        <div>
          {/* <h1 className="details-heading">Details for {packageName}</h1> */}

          <table className="table table-hover details-table">
          <caption>Details for {packageName}</caption>
            <tbody>
              <tr>
                <th>Version:</th>
                <td>{packageDetails.version || 'N/A'}</td>
              </tr>
              <tr>
                <th>Name:</th>
                <td>{packageDetails.name}</td>
              </tr>
              <tr>
                <th>Description:</th>
                <td>{packageDetails.description}</td>
              </tr>
              <tr>
                <th>Author:</th>
                <td>{packageDetails.author.name} ({packageDetails.author.email})</td>
              </tr>
              <tr>
                <th>Homepage:</th>
                <td><a href={packageDetails.homepage} target="_blank" rel="noopener noreferrer">{packageDetails.homepage}</a></td>
              </tr>
              <tr>
                <th>Repository Type:</th>
                <td>{packageDetails.repository.type}</td>
              </tr>
              <tr>
                <th>Repository URL:</th>
                <td>{packageDetails.repository.url}</td>
              </tr>
              <tr>
                <th>Main:</th>
                <td>{packageDetails.main}</td>
              </tr>
              <tr>
                <th>Keywords:</th>
                <td>{packageDetails.keywords.join(', ')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>No further details available.</p>
      )}

        </div>

        <button className='btn loadMore' onClick={handleButtonClick}>Back</button>
        {/* <button className='btn loadMore' onClick={handleBackToSearchClick}>Back to Search Results</button> */}



        </>
    );
};

export default PackageDetailsPage