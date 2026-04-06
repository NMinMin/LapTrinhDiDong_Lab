const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'lab7_secret_key_2024';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection - Connect only to the database 'Lab7'
mongoose.connect('mongodb://localhost:27017/Lab7')
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.log('MongoDB connection error: ', err));

// ============ SCHEMAS ============

// Define Item Schema mapping for Compass Collection 'Item'
const itemSchema = new mongoose.Schema({
    _id: { type: String }, // Explicitly handling string IDs "1", "2"...
    "Tên": { type: String },
    "Mô tả": { type: String }
}, { collection: 'Item', versionKey: false });

const Item = mongoose.model('Item', itemSchema);

// Define User Schema for collection 'users'
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { collection: 'users', versionKey: false });

const User = mongoose.model('User', userSchema);

// ============ AUTH ROUTES ============

// POST /register: Đăng ký tài khoản mới
app.post('/register', async (req, res) => {
    console.log('Incoming REGISTER request:', req.body.username);
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Vui lòng cung cấp username và password.' });
    }
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        console.log('User registered:', username);
        res.status(201).json({ message: 'Đăng ký thành công!' });
    } catch (error) {
        console.error('REGISTER Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

// POST /login: Đăng nhập
app.post('/login', async (req, res) => {
    console.log('Incoming LOGIN request:', req.body.username);
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Vui lòng nhập username và password.' });
    }
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Tên đăng nhập không tồn tại.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Mật khẩu không chính xác.' });
        }
        const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
        console.log('User logged in:', username);
        res.json({ message: 'Đăng nhập thành công!', token, username: user.username });
    } catch (error) {
        console.error('LOGIN Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

// ============ ITEM ROUTES (CRUD) ============

// GET: Lấy tất cả items
app.get('/items', async (req, res) => {
    console.log('Incoming GET request to /items');
    try {
        const items = await Item.find();
        const mappedItems = items.map(item => ({
            _id: item._id,
            name: item['Tên'] || item.name || 'Không rõ tên',
            description: item['Mô tả'] || item.description || ''
        }));
        res.json(mappedItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST: Tạo item mới
app.post('/items', async (req, res) => {
    console.log('Incoming POST request (Add):', req.body);
    const item = new Item({
        _id: new mongoose.Types.ObjectId().toString(),
        'Tên': req.body.name,
        'Mô tả': req.body.description
    });
    try {
        const newItem = await item.save();
        console.log('Item created successfully:', newItem._id);
        res.status(201).json({
            _id: newItem._id,
            name: newItem['Tên'],
            description: newItem['Mô tả']
        });
    } catch (error) {
        console.error('POST Error:', error.message);
        res.status(400).json({ message: error.message });
    }
});

// PUT: Cập nhật item
app.put('/items/:id', async (req, res) => {
    console.log('Incoming PUT request (Update) for ID:', req.params.id, req.body);
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            { 'Tên': req.body.name, 'Mô tả': req.body.description },
            { new: true }
        );
        console.log('Item updated successfully');
        res.json({
            _id: updatedItem._id,
            name: updatedItem['Tên'],
            description: updatedItem['Mô tả']
        });
    } catch (error) {
        console.error('PUT Error:', error.message);
        res.status(400).json({ message: error.message });
    }
});

// DELETE: Xoá item
app.delete('/items/:id', async (req, res) => {
    console.log('Incoming DELETE request for ID:', req.params.id);
    try {
        await Item.findByIdAndDelete(req.params.id);
        console.log('Item deleted successfully');
        res.json({ message: 'Item deleted' });
    } catch (error) {
        console.error('DELETE Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
