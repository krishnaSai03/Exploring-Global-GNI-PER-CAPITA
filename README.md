# Data-Visualization
GNI per capita 

Open the `index.html` file in your web browser to view the visualization.

## Overview index.html

The visualization includes the following components:

1. **Scatter Plot**: 
   - The scatter plot represents each country as a point, with GNI per capita on the x-axis and life expectancy on the y-axis.
   - Detailed information about each country is displayed when hovering over its respective point.

2. **Line Graph**:
   - The line graph displays the Gross National Income (GNI) per capita over time for a selected country. This provides insights into economic growth trends.

3. **Choropleth Map**:
   - The choropleth map visualizes GNI per capita across different countries on a map. The color intensity represents the GNI value, with darker colors indicating higher GNI per capita.

## How to Use

1. **Selecting Data**:
   - Use the dropdown menus to select the desired year and country for analysis.

2. **Interacting with Visualizations**:
   - Hover over points in the scatter plot to view detailed information about each country.
   - Use the line graph to observe GNI per capita trends over time for a specific country.
   - Explore the choropleth map to visualize GNI per capita across different countries.

#### File: Economies.html
### Economies Page
The "Economies" page allows users to upload a CSV file containing GNI per capita data. Upon upload, it generates a table displaying the top countries based on their most recent GNI per capita values. Users can specify the number of top countries to display and upload their CSV files for analysis.


#### File: IncomeGroup.html
### Income Group Page
The "Income Group" page enables users to filter countries based on their income groups. Users can upload a CSV file containing GNI per capita data and select an income group from a dropdown menu. The page then displays the countries belonging to the selected income group.

## Technologies Used

**Frontend Development**:
  - **HTML5**: Used for structuring the web pages.
  - **CSS3**: Used for styling the web pages and providing a better user interface.
  - **JavaScript (ES6+)**: Used for adding interactivity and dynamic behavior to the web pages.
  - **jQuery**: JavaScript library used for simplifying DOM manipulation and event handling.
  - **Plotly.js**: JavaScript library used for creating interactive charts and graphs.
  - **Leaflet.js**: JavaScript library used for creating interactive maps.

**Data Processing**:
  - **PapaParse**: JavaScript library used for parsing CSV files.

## Data Sources

The visualization data is obtained from the following CSV files:

- GNI per capita.csv: This file contains data on Gross National Income (GNI) per capita.
- Income Group.csv: Provides information about the income groups of countries.
- Life Expectancy.csv: Contains data related to life expectancy in different countries.
- Merged_GNI_Life_Expectancy.csv: A merged dataset combining GNI per capita and life expectancy data.

These CSV files serve as the primary sources of data for the visualizations presented in the project.


## Repository

1. Clone the repository: https://github.com/krishnaSai03/Data-Visualization


