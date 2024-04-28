 // Global variable to store merged data
var mergedData;

// Function to parse the merged CSV file containing GDP and life expectancy data
function parseMergedFile() {
    $.ajax({
        url: 'Merged_GNI_Life_Expectancy.csv',
        dataType: 'text',
        success: function(data) {
            mergedData = Papa.parse(data, {
                header: true,
                dynamicTyping: true
            }).data;
            generateScatterPlot(1962); // Initial plot for 1962
        },
        error: function(xhr, status, error) {
            console.error('Failed to fetch merged CSV file:', error);
        }
    });
}

// Function to generate scatter plot
function generateScatterPlot(year) {
    try {
        // Extracting data for the specified year from the merged file
        var countries = [];
        var gniData = [];
        var lifeExpectancyData = [];
        var colors = [];

        mergedData.forEach(function(row) {
            countries.push(row['Country Name']);
            gniData.push(row[year + '_GNI']);
            lifeExpectancyData.push(row[year + '_Life_Expectancy']);
            // Assigning a random color for each country
            colors.push(getRandomColor());
        });

        // Creating the scatter plot using Plotly.js
        var trace = {
            x: gniData,
            y: lifeExpectancyData,
            mode: 'markers',
            type: 'scatter',
            marker: {
                color: colors
            },
            text: countries.map((country, index) => `${country}<br>GNI: $${gniData[index]}<br>Life Expectancy: ${lifeExpectancyData[index]} years`),
            hoverinfo: 'text'
        };

        var layout = {
            title: `GNI per capita & Life Expectancy (${year})`,
            xaxis: {
                title: 'GNI per capita (USD)'
            },
            yaxis: {
                title: 'Life Expectancy (years)'
            }
        };

        Plotly.newPlot('scatterPlot', [trace], layout);
    } catch (error) {
        console.error('Error generating scatter plot:', error);
    }
}

// Function to generate a random color
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Automatically parse the merged file on page load
$(document).ready(function() {
    parseMergedFile();
    var isPlaying = false;
    var yearSlider = $('#yearSlider');

    // Initialize slider
    yearSlider.slider({
        range: 'min',
        min: 1962,
        max: 2021,
        step: 1,
        value: 1962, // Initial value
        slide: function(event, ui) {
            var year = ui.value;
            generateScatterPlot(year);
        }
    });

    // Play button functionality
    $('#playButton').click(function() {
        isPlaying = !isPlaying;
        if (isPlaying) {
            $(this).text('Pause');
            var currentYear = yearSlider.slider('value');
            if (currentYear === 2021) {
                yearSlider.slider('value', 1962); // Reset to 1962 if at max value
            }
            playSlider();
        } else {
            $(this).text('Play');
            clearInterval(interval);
        }
    });

    function playSlider() {
        interval = setInterval(function() {
            var currentYear = yearSlider.slider('value');
            if (currentYear < 2021) {
                yearSlider.slider('value', currentYear + 1);
                generateScatterPlot(currentYear + 1);
            } else {
                $('#playButton').text('Play');
                clearInterval(interval);
            }
        }, 400); // Change interval as needed
    }

});
