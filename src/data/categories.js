export default {
  id: 3,
  title: 'Наушники',
  slug: 'naushniki',
  productProps: [
    {
      id: 1,
      title: 'Длина кабеля',
      code: 'length',
      availableValues: [
        {
          value: '1 метр',
          productsCount: 1
        },
        {
          value: '2 метра',
          productsCount: 2
        },
        {
          value: '3 метра',
          productsCount: 0
        }
      ]
    },
    {
      id: 2,
      title: 'Материал оплетки',
      code: 'material',
      availableValues: [
        {
          value: '25 000 м',
          productsCount: 0
        }
      ]
    },
    {
      id: 7,
      title: 'Цвет',
      code: 'color',
      availableValues: [
        {
          value: 'Зеленый',
          productsCount: 0
        },
        {
          value: 'Красный',
          productsCount: 1
        },
        {
          value: 'Оранжевый',
          productsCount: 1
        },
        {
          value: 'Серый',
          productsCount: 2
        },
        {
          value: 'Черный',
          productsCount: 3
        }
      ]
    }
  ]
}
