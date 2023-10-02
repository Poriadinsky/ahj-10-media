import Timeline from '../Timeline';

const timeline = new Timeline();

test('Неверное количество (один параметр)', () => {
  const current = timeline.toValidate('55');
  const result = false;

  expect(current).toEqual(result);
});

test('Неверная широта', () => {
  const current = timeline.toValidate('155, 38');
  const result = false;

  expect(current).toEqual(result);
});

test('Неверная долгота', () => {
  const current = timeline.toValidate('55, 238');
  const result = false;

  expect(current).toEqual(result);
});

test('Верные данные', () => {
  const current = timeline.toValidate('55, 38');
  const result = '[55°,  38°]';

  expect(current).toEqual(result);
});
