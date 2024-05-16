import express from 'express';
import Character from '../schemas/characters.schema.js';

const router = express.Router();

// 캐릭터 삭제
router.delete('/:id', async (req, res) => {
  try {
    const characterId = req.params.id;

    // MongoDB에서 해당 캐릭터 삭제
    await Character.findByIdAndDelete(characterId);

    res.status(200).json({ message: '캐릭터가 성공적으로 삭제되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 에러: 캐릭터 삭제에 실패했습니다.' });
  }
});

export default router;
