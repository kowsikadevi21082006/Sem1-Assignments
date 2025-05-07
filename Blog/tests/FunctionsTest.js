const title = 'OOPs';
const detail = 'OOPs is awesome';
let blog = new Blog(title, detail);

describe('Create two methods : addTitle and addDescription inside the class Blog - ', function () {
  it('Defines addTitle', function () {
    expect(typeof blog.addTitle).toBe('function');
  });

  it('Defines addDescription', function () {
    expect(typeof blog.addDescription).toBe('function');
  });
});

describe('Create helper functions for eventListners - ', function () {
  it('Defines helperAddPost', function () {
    expect(typeof blog.addTitle).toBe('function');
  });

  it('Defines helperPost', function () {
    expect(typeof blog.addDescription).toBe('function');
  });
});
