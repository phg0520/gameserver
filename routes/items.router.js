import express from 'express';
import Item from '../schemas/items.schema.js';

const router = express.Router();

// 아이템 생성
router.post('/', async (req, res) => {
  try {
    const { item_code, item_name, item_ability } = req.body;

    // 이미 존재하는 아이템 코드인지 확인
    const existingItem = await Item.findOne({ item_code });
    if (existingItem) {
      return res.status(400).json({ error: '이미 존재하는 아이템 코드입니다.' });
    }

    // 새로운 아이템 생성
    const newItem = new Item({ item_code, item_name, item_ability });
    await newItem.save();

    res.status(201).json({ item_id: newItem._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 아이템 수정
router.put('/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const { item_name, item_ability } = req.body;

    const updatedItem = await Item.findByIdAndUpdate(itemId, { item_name, item_ability }, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ error: '아이템을 찾을 수 없습니다.' });
    }

    res.status(200).json({ message: '아이템이 성공적으로 수정되었습니다.', updatedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 에러: 아이템 수정에 실패했습니다.' });
  }
});

// 아이템 목록 조회
router.get('/', async (req, res) => {
  try {
    const items = await Item.find({}, 'item_code item_name');
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 아이템 상세 조회
router.get('/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Item.findById(itemId, 'item_code item_name item_ability');
    if (!item) {
      return res.status(404).json({ error: '아이템을 찾을 수 없습니다.' });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 에러: 아이템 조회에 실패했습니다.' });
  }
});

export default router;
