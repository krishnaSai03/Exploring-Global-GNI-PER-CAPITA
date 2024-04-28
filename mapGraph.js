$(document).ready(function() {
    var gniData;

    // Function to parse the CSV file containing GNI per capita data
    function parseGniCSV() {
        $.ajax({
            url: 'GNI per capita.csv',
            dataType: 'text',
            success: function(data) {
                gniData = Papa.parse(data, {
                    header: true,
                    dynamicTyping: true
                }).data;

                // Initialize the choropleth map
                generateChoroplethMap(1962); // Default to 1962
            },
            error: function(xhr, status, error) {
                console.error('Failed to fetch GNI per capita CSV file:', error);
            }
        });
    }

    // Function to generate choropleth map for selected year
    function generateChoroplethMap(year) {
        var yearData = gniData.map(function(d) {
            return {
                'ISO3': d['Country Code'],
                'GNI': d[year],
                'CountryName': d['Country Name']
            };
        }).filter(function(d) {
            return d.GNI !== null && d.GNI !== undefined;
        });

        var data = [{
            type: 'choropleth',
            locations: yearData.map(d => d.ISO3),
            z: yearData.map(d => d.GNI),
            text: yearData.map(d => d.CountryName),
          colorscale: [
    [0, 'rgb(198, 219, 239)'], // Light blue
    [0.5, 'rgb(107, 174, 214)'], // Medium blue
    [1, 'rgb(8, 81, 156)'] // Dark blue
               ],

            autocolorscale: false,
            reversescale: false,
            marker: {
                line: {
                    color: 'darkgray',
                    width: 0.5
                }
            },
            colorbar: {
                title: 'GNI Per Capita (USD)',
                thickness: 10
            }
        }];

        var layout = {
            title: `GNI Per Capita (${year})`,
            geo: {
                showframe: false,
                showcoastlines: true,
                coastlinecolor: 'rgb(217,217,217)',
                projection: {
                    type: 'mercator'
                },
                resolution: 50,
                center: {
                    lon: 0,
                    lat: 30
                },
                lonaxis: { range: [-180, 180] },
                lataxis: { range: [-60, 90] }
            },
            autosize: true,
            height: 600, // Adjust the height
            width: 1000  // Adjust the width
        };

        Plotly.newPlot('mapGraph', data, layout);
    }

    // Event listener for year input change
    $('#yearInput').on('input', function() {
        var year = $(this).val();
        if (year >= 1962 && year <= 2022) {
            generateChoroplethMap(year);
        }
    });

    // Parse the CSV file on document load
    parseGniCSV();
});
