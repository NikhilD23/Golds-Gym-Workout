import React, {useEffect, useState} from 'react'
import {Box, TextField, Button, Stack, Typography} from '@mui/material';
import { exerciseOptions, fetchData } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';

const SearchExercises = ({setExercises, bodyPart, setBodyPart}) => {
  const [search, setSearch] = useState('');
  
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {

    const fetchExercises = async () => {
      const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList?limit=0&offset=0', exerciseOptions);
      
      setBodyParts(['all', ...bodyPartsData]);
    }

    fetchExercises();
  }, [])

  const handleSearch = async () => {
    setExercises([]);
    if(search){
      const exercisesData = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises?limit=0&offset=0',
        exerciseOptions); 

        const searchedExercises = exercisesData.filter(
          (exercise) => exercise.name.toLowerCase().includes(search) 
          || exercise.target.toLowerCase().includes(search) 
          || exercise.equipment.toLowerCase().includes(search) 
          || exercise.bodyPart.toLowerCase().includes(search) 
        );

          setSearch('');
          setExercises(searchedExercises);
        }
    }

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography 
        fontWeight={700} sx={{
          fontSize: {lg:'44px', xs:'30px'}}}
          mb="50px" textAlign="center"
      >
        Awesome Exercises you <br />should try!
      </Typography>
      <Box position="relative" mb="72px">
          <TextField
            sx={{
              input: { 
                fontWeight: '700', 
                border: 'none', 
                borderRadius: '4px',
              },
              width: {lg:'800px', xs:'350px'},
              backgroundColor: '#fff',
              borderRadius: '40px',
              marginLeft: '18%',
            }}
            height="76px"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="Search exercises"
            type="text"
          />
          <Button className="search-btn"
            sx={{
              bgcolor: '#FF2625',
              color: '#fff',
              textTransform: 'none',
              width: {lg:'175px', xs:'80px'},
              fontSize: {lg:'20px', xs:'14px'},
              height: '56px',
              position: "absolute",
              right: '0',
              marginRight: '26.4%',
            }}
            onClick={handleSearch}
          >
            Search
          </Button>
      </Box>
      <Box
      sx={{ position: 'relative', width: '100%', p: '20px'}}
      >
        <HorizontalScrollbar data={bodyParts} bodyParts setBodyPart={setBodyPart} bodyPart={bodyPart} isBodyParts />
      </Box>
    </Stack>
  )
}

export default SearchExercises