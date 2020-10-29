import React, {useState} from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

export default function LocationSearchInput({setCoor}) {

  
  const [address, setAddress] = useState('')


  const handleSelect = address => {
    setAddress('')
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => setCoor(latLng))
      .catch(error => console.error('Error', error));
  };
 
  
    return (
      <PlacesAutocomplete
        value={address}
        onChange={(e) => setAddress(e)}
        onSelect={handleSelect}
        highlightFirstSuggestion={true}
        searchOptions={{
          types:['geocode'],
          componentRestrictions: {
              country: ['de']
          },
        }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'search location-search-input',
              })}
            />
            <div className="dropdown">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  
}