class BeerDataLoader {
  constructor(dataDir, forceProcess = false) {
    this.dataDir = dataDir;
    this.forceProcess = forceProcess;

    // Define file paths
    this.reviewsTxt = `${this.dataDir}/reviews.txt`;
    this.ratingsTxt = `${this.dataDir}/ratings.txt`;
    this.beersCsv = `${this.dataDir}/beers.csv`;
    this.breweriesCsv = `${this.dataDir}/breweries.csv`;
    this.usersCsv = `${this.dataDir}/users.csv`;
    this.reviewsProcessedCsv = `${this.dataDir}/reviews_processed.csv`;
    this.ratingsProcessedCsv = `${this.dataDir}/ratings_processed.csv`;

    // DataFrames
    this.reviewsDf = null;
    this.ratingsDf = null;
    this.beersDf = null;
    this.breweriesDf = null;
    this.usersDf = null;
  }

  processReviews() {
    if (!this.forceProcess && this.fileExists(this.reviewsProcessedCsv)) {
      console.log(`Processed file '${this.reviewsProcessedCsv}' already exists. Skipping processing.`);
      return;
    }

    const columns = [
      "beer_name", "beer_id", "brewery_name", "brewery_id", "style", "abv", "date",
      "user_name", "user_id", "appearance", "aroma", "palate", "taste", "overall", "rating", "text"
    ];

    const fs = require('fs');
    const readline = require('readline');
    const inputStream = fs.createReadStream(this.reviewsTxt, 'utf8');
    const outputStream = fs.createWriteStream(this.reviewsProcessedCsv);
    const writer = require('csv-write-stream')({ headers: columns });

    inputStream.pipe(readline.createInterface({ input: inputStream, output: process.stdout, terminal: false }))
      .on('line', line => {
        let review = {};
        line = line.trim();
        if (line) {
          if (line.includes(": ")) {
            let [key, value] = line.split(": ");
            if (columns.includes(key)) {
              review[key] = value;
            }
          } else {
            if (line.endsWith(":")) {
              let key = line.slice(0, -1);
              if (columns.includes(key)) {
                review[key] = "";
              }
            }
          }
        } else {
          if (Object.keys(review).length > 0) {
            writer.write({ ...columns.reduce((acc, col) => ({ ...acc, [col]: review[col] || '' }), {}) });
            review = {};
          }
        }
      })
      .on('close', () => {
        console.log(`Processing completed. Processed data saved to '${this.reviewsProcessedCsv}'.`);
      });
  }

  processRatings() {
    if (!this.forceProcess && this.fileExists(this.ratingsProcessedCsv)) {
      console.log(`Processed file '${this.ratingsProcessedCsv}' already exists. Skipping processing.`);
      return;
    }

    const columns = [
      "beer_name", "beer_id", "brewery_name", "brewery_id", "style", "abv", "date",
      "user_name", "user_id", "appearance", "aroma", "palate", "taste", "overall", "rating",
      "text", "review"
    ];

    const fs = require('fs');
    const readline = require('readline');
    const inputStream = fs.createReadStream(this.ratingsTxt, 'utf8');
    const outputStream = fs.createWriteStream(this.ratingsProcessedCsv);
    const writer = require('csv-write-stream')({ headers: columns });

    inputStream.pipe(readline.createInterface({ input: inputStream, output: process.stdout, terminal: false }))
      .on('line', line => {
        let review = {};
        line = line.trim();
        if (line) {
          if (line.includes(": ")) {
            let [key, value] = line.split(": ");
            if (columns.includes(key)) {
              review[key] = value;
            }
          } else {
            if (line.endsWith(":")) {
              let key = line.slice(0, -1);
              if (columns.includes(key)) {
                review[key] = "";
              }
            }
          }
        } else {
          if (Object.keys(review).length > 0) {
            review.text = review.text || "";
            review.review = review.review || "False";
            writer.write({ ...columns.reduce((acc, col) => ({ ...acc, [col]: review[col] || '' }), {}) });
            review = {};
          }
        }
      })
      .on('close', () => {
        console.log(`Processing completed. Processed data saved to '${this.ratingsProcessedCsv}'.`);
      });
  }

  loadReviews() {
    if (this.reviewsDf) return Promise.resolve(this.reviewsDf);
  
    this.processReviews();
  
    return fetch(this.reviewsProcessedCsv)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch ${this.reviewsProcessedCsv}: ${response.statusText}`);
        }
        return response.text();
      })
      .then(csvText => {
        this.reviewsDf = Papa.parse(csvText, { header: true, skipEmptyLines: true }).data;
        return this.reviewsDf;
      })
      .catch(error => {
        console.error("Error loading reviews:", error);
        // Optionally, handle the error further (e.g., show a user-friendly message)
        throw error;  // Re-throw the error so the caller can handle it as well
      });
  }
  


  loadRatings() {
    if (this.ratingsDf) return Promise.resolve(this.ratingsDf);
    this.processRatings();
    
    return fetch(this.ratingsProcessedCsv)
        .then(response => response.text())
        .then(csvText => {
            this.ratingsDf = Papa.parse(csvText, { header: true, skipEmptyLines: true }).data;
            return this.ratingsDf;
        });
  }


  loadBeers() {
    if (this.beersDf) return Promise.resolve(this.beersDf);

    return fetch(this.beersCsv)
        .then(response => response.text())
        .then(csvText => {
            this.beersDf = Papa.parse(csvText, { header: true, skipEmptyLines: true }).data;
            return this.beersDf;
        });
  }


  loadBreweries() {
    if (this.breweriesDf) return Promise.resolve(this.breweriesDf);

    return fetch(this.breweriesCsv)
        .then(response => response.text())
        .then(csvText => {
            this.breweriesDf = Papa.parse(csvText, { header: true, skipEmptyLines: true }).data;
            return this.breweriesDf;
        });
  }

  loadUsers() {
    if (this.usersDf) return Promise.resolve(this.usersDf);

    return fetch(this.usersCsv)
        .then(response => response.text())
        .then(csvText => {
            this.usersDf = Papa.parse(csvText, { header: true, skipEmptyLines: true }).data;
            return this.usersDf;
        });
  }


  loadAllData() {
    console.log("got there 1")
    return Promise.all([
      this.loadReviews(),
      //this.loadRatings(),
      //this.loadBeers(),
      //this.loadBreweries(),
      //this.loadUsers()
    ]).then(([reviewsDf]) => { //.then(([reviewsDf, ratingsDf, beersDf, breweriesDf, usersDf]) => {
      console.log("Here we are")
      return { reviewsDf }
      //return { reviewsDf, ratingsDf, beersDf, breweriesDf, usersDf };
    });
  }

  async fileExists(path) {
    try {
      const response = await fetch(path, { method: 'HEAD' });
      return response.ok;  // If the file exists, the status will be 200
    } catch (err) {
        return false;  // If there's an error (e.g., network issues), return false
    }
  }

}

export default BeerDataLoader;