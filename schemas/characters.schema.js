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

    // 가장 큰 character_id를 찾아서 새로운 ID를 생성
    const lastCharacter = await Character.findOne().sort({ character_id: -1 });
    const newCharacterId = lastCharacter ? lastCharacter.character_id + 1 : 1;

    // 새로운 캐릭터 생성
    const newCharacter = new Character({ 
      character_id: newCharacterId, 
      name: character_name, 
      health: 500, 
      power: 100 
    });
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

    // MongoDB에서 해당 캐릭터 삭제
    await Character.findByIdAndDelete(characterId);

    res.status(200).json({ message: '캐릭터가 성공적으로 삭제되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '캐릭터 삭제에 실패했습니다.' });
  }
});

// 캐릭터 상세 정보 조회
router.get('/:id', async (req, res) => {
  try {
    const characterId = req.params.id;

    // MongoDB에서 캐릭터를 ID로 조회
    const character = await Character.findById(characterId);
    if (!character) {
      return res.status(404).json({ error: '캐릭터를 찾을 수 없습니다.' });
    }

    // 캐릭터 상세 정보 반환
    res.status(200).json({
      name: character.name,
      health: character.health,
      power: character.power,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '캐릭터 조회에 실패했습니다.' });
  }
});

// 아이템 생성 API
router.post('/items', async (req, res) => {
  try {
    const { code, name, ability } = req.body;

    // 이미 존재하는 아이템 코드인지 확인
    const existingItem = await Item.findOne({ code });
    if (existingItem) {
      return res.status(400).json({ error: '이미 존재하는 아이템 코드입니다.' });
    }

    // 새로운 아이템 생성
    const newItem = new Item({ code, name, ability });
    await newItem.save();

    res.status(201).json({ item_id: newItem._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 아이템 수정 API
router.put('/items/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const { name, ability } = req.body;

    // MongoDB에서 해당 아이템 수정
    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      { name, ability },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: '아이템을 찾을 수 없습니다.' });
    }

    res.status(200).json({ message: '아이템이 성공적으로 수정되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 아이템 목록 조회 API
router.get('/items', async (req, res) => {
  try {
    // MongoDB에서 모든 아이템 조회
    const items = await Item.find({}, 'code name');

    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 아이템 상세 조회 API
router.get('/items/:id', async (req, res) => {
  try {
    const itemId = req.params.id;

    // MongoDB에서 해당 아이템 조회
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ error: '아이템을 찾을 수 없습니다.' });
    }

    res.status(200).json({
      code: item.code,
      name: item.name,
      ability: item.ability,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
