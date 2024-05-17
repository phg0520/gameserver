import express from 'express';
import Character from '../schemas/characters.schema.js';

const router = express.Router();

// 캐릭터 생성
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    // 이미 존재하는 캐릭터명인지 확인
    const existingCharacter = await Character.findOne({ name });
    if (existingCharacter) {
      return res.status(400).json({ error: '이미 존재하는 캐릭터명입니다.' });
    }

    // 새로운 캐릭터 생성
    const newCharacter = new Character({ name });
    await newCharacter.save();

    res.status(201).json({ character_id: newCharacter._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 캐릭터 삭제
router.delete('/:id', async (req, res) => {
  try {
    const characterId = req.params.id;
    await Character.findByIdAndDelete(characterId);
    res.status(200).json({ message: '캐릭터가 성공적으로 삭제되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 에러: 캐릭터 삭제에 실패했습니다.' });
  }
});

// 캐릭터 상세 조회
router.get('/:id', async (req, res) => {
  try {
    const characterId = req.params.id;
    const character = await Character.findById(characterId, 'name health power');
    if (!character) {
      return res.status(404).json({ error: '캐릭터를 찾을 수 없습니다.' });
    }
    res.status(200).json(character);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 에러: 캐릭터 조회에 실패했습니다.' });
  }
});

export default router;
