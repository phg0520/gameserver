import express from 'express';

const router = express.Router();

// 캐릭터 생성 API
router.post('/', async (req, res) => {
  try {
    const { character_name } = req.body;

    // 이미 존재하는 캐릭터명인지 확인
    const existingCharacter = await Character.findOne({ name: character_name });
    if (existingCharacter) {
      return res.status(400).json({ error: '이미 존재하는 캐릭터명입니다.' });
    }

    // 새로운 캐릭터 생성
    const newCharacter = new Character({ name: character_name, health: 500, power: 100 });
    await newCharacter.save();

    res.status(201).json({ character_id: newCharacter._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
