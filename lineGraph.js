$(document).ready(function() {
    // Global variable to store the merged data
    var mergedData;

    // Function to parse the CSV file containing GNI and life expectancy data
    function parseCSVFile() {
        $.ajax({
            url: 'GNI per capita.csv',
            dataType: 'text',
            success: function(data) {
                mergedData = Papa.parse(data, {
                    header: true,
                    dynamicTyping: true
                }).data;

                // Populate the country dropdown
                populateCountryDropdown();
            },
            error: function(xhr, status, error) {
                console.error('Failed to fetch GNI per capita CSV file:', error);
            }
        });
    }

    // Function to populate the country dropdown
    function populateCountryDropdown() {
        var countries = [...new Set(mergedData.map(item => item['Country Name']))].sort();
        var dropdown = $('#countrySelect');

        countries.forEach(function(country) {
            dropdown.append($('<option></option>').attr('value', country).text(country));
        });

        // Initialize the line graph for the first country in the dropdown
        generateLineChart(countries[0]);
    }

    // Function to generate line chart for selected country
function generateLineChart(country) {
    var countryData = mergedData.filter(function(d) {
        return d['Country Name'] === country;
    })[0]; // Get the first matching country data

    var years = Object.keys(countryData).filter(k => !isNaN(k)).sort();
    var gniPerCapita = years.map(year => countryData[year]);

    var trace = {
        x: years,
        y: gniPerCapita,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'GNI Per Capita',
        text: years.map((year, index) => `Year: ${year}, GNI: $${gniPerCapita[index]}`),
        hoverinfo: 'text'
    };

    var layout = {
        title: 'GNI Per Capita Over Time: ' + country,
        xaxis: {
            title: 'Year'
        },
        yaxis: {
            title: 'GNI Per Capita (USD)'
        }
    };

    Plotly.newPlot('lineGraph', [trace], layout);
}


    // Event listener for country dropdown change
    $('#countrySelect').change(function() {
        var selectedCountry = $(this).val();
        generateLineChart(selectedCountry);
    });

    // Parse the CSV file on document load
    parseCSVFile();
});
