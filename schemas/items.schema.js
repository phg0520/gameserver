import express from 'express';

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