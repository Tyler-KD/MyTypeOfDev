module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  
  
  //Yash's Customization, themes & animation!
  theme: {
    extend: {
      
      animation: {
        "bounce1": "bounce 1s linear infinite",
        "bounce2": "bounce 2s linear infinite",
        "bounce3": "bounce 3s linear infinite",
        "bounce4": "bounce 4s linear infinite",
        "bounce5": "bounce 5s linear infinite",

        "dropin1": "dropin .6s linear",
        "slidein1": "slidein .4s linear",
        "slidein2": "slideinR .4s linear",

        gradient: "gradient 15s linear infinite"

    },

    

    
    keyframes:{ 
      "dropin": {
        "0%" : {transform: "rotate(-0deg) translateY(-100%)"},
      }, 

      "slidein": {
        "0%" : {transform: "rotate(-0deg) translateX(-100%)"},
      },

      "slideinR": {
        "0%" : {transform: "rotate(-0deg) translateX(100%)"}
      },

      gradient: {
        "0%": {backgroundPostion: "0% 50%"},
        "100%": {backgroundPosition: "100% 50%"},
      }

  

    },



  
  },
  


},
  plugins: [
    require("tailwindcss"),
    require("autoprefixer")
  ],
}


