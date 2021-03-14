const mongoose=require('mongoose');

const Schema=mongoose.Schema;

//creating the schema for Student Progress in the database
const studentProgress=new Schema({
    emailID:{
        unique: true,
        type: String,
        required: true
    },
    conqueredUniverse:{
        type: Number,
        default: 0,
        min: 0,
        required:true
    },
    conqueredSolarSystem:{
        type: Number,
        default: 0,
        min: 0,
        required:true
    },
    conqueredPlanet:{
        type: Number,
        default: 0,
        min: 0,
        required:true
    },
    fullDict:{
        universe: {
            solarSystem: {
                planet: {
                    planetName: {
                        type: String,
                        required: true,
                        unique: true
                    },
                    maxScore: {
                        type: Number,
                        min: 0,
                        max: 100,
                        required: true
                    },
                    minScore: {
                        type: Number,
                        min: 0,
                        max: 100,
                        required: true
                    },
                    avgScore: {
                        type: Number,
                        min: 0,
                        max: 100,
                        required: true
                    }
                }
            }
        }
    },
    solarSystemDict:{
        universe: {
            solarSystem: {
                solarSystemName: {
                    type: String,
                    required: true,
                    unique: true
                },
                maxScore: {
                    type: Number,
                    min: 0,
                    max: 100,
                    required: true
                },
                minScore: {
                    type: Number,
                    min: 0,
                    max: 100,
                    required: true
                },
                avgScore: {
                    type: Number,
                    min: 0,
                    max: 100,
                    required: true
                }
            }
        }
    },
    universeDict:{
        universe: {
            universeName: {
                type: String,
                required: true,
                unique: true
            },
            maxScore: {
                type: Number,
                min: 0,
                max: 100,
                required: true
            },
            minScore: {
                type: Number,
                min: 0,
                max: 100,
                required: true
            },
            avgScore: {
                type: Number,
                min: 0,
                max: 100,
                required: true
            }
        }
    }
});

//making the mongoose model and exporting it
const StudentProgress=mongoose.model('StudentProgress',studentProgress);
module.exports=StudentProgress;