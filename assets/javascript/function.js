const ratings = {
    businessA: 2.8,
    businessB: 3.3,
    businessC: 1.9,
    businessD: 4.3,
    businessE: 4.74,
    businessF: 2.98,
    businessG: 5
}

// Number of stars 
const starTotal = 5;

for(const [key, rating] of Object.entries(ratings))    {
    
    //2
    const starPercentage = (rating / starTotal) * 100;
    console.log('ratings[rating]');
    console.log(rating);
   
    //3
    const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;

    //4
    document.querySelector(`.${key} .stars-inner`).style.width = starPercentageRounded;
}
