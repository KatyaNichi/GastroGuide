import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';


const app = express();
const uri = 'mongodb+srv://katyanichiporenko:GDV0EQEzqPkGdmBR@cluster0.dxgqfrb.mongodb.net/?retryWrites=true&w=majority';

// Define the User model
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  favorites: [{ type: mongoose.Schema.Types.String, ref: 'Recipe' }],
});

// create the User model
const User = mongoose.model('User', userSchema); 

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connect();

//app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.post('/api/signup', async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body); 
    console.log('User created:', newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.post('/api/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password }).exec();
    if (user) {
      res.status(200).json({ userId: user._id, message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// add a recipe to favorites
app.post('/api/favorites/add', async (req: Request, res: Response) => {
  try {
    const { userId, recipeId } = req.body;
    console.log('Received recipeId:', recipeId);
    const user = await User.findById(userId).exec();

    if (!user) {
      console.error('User not found');
      return res.status(400).json({ error: 'User not found' });
    }
    if (!user.favorites.includes(recipeId)) {
      user.favorites.push(recipeId);
      await user.save();
      console.log('Recipe added to favorites');
      return res.status(200).json({ message: 'Recipe added to favorites' });
    }

    console.error('Recipe is already in favorites');
    return res.status(400).json({ error: 'Recipe is already in favorites' });
  } catch (error) {
    console.error('Error adding recipe to favorites:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/favorites/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const favorites = user.favorites;
    res.json({ favorites });
  } catch (error) {
    console.error('Error fetching user favorites:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/favorites/remove', async (req: Request, res: Response) => {
  try {
    const { userId, recipeId } = req.body;
    const user = await User.findById(userId).exec();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const index = user.favorites.indexOf(recipeId);
    if (index !== -1) {
      user.favorites.splice(index, 1);
      await user.save();
      console.log('Recipe removed from favorites');
      return res.status(200).json({ message: 'Recipe removed from favorites' });
    }

    return res.status(400).json({ error: 'Recipe is not in favorites' });
  } catch (error) {
    console.error('Error removing recipe from favorites:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const port = process.env.PORT || 4444;

app.get('/', (req: Request, res: Response) => {
  const userAgent = req.headers['user-agent'];
  res.send('Server is running!');
  console.log(userAgent);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
