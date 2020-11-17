const { Style, Rectangle, Group, Shape, ShapePath } = require('sketch/dom');

const defaultValues = {
  width: 600,
  height: 300
}

const showValueError = () => {
  const alert = COSAlertWindow.alloc().init();
  alert.setMessageText('Valid values are required.');
  alert.runModal();
};

const style = {
  boundingRect: {
    fills: [],
    borders: [],
  },
  shape: {
    fills: [{
      color: '#0006',
    }],
    borders: [],
  },
  line: {
    fills: [],
    borders: [{
      color: '#000c',
      position: Style.BorderPosition.Center,
      thickness: 2,
    }],
    borderOptions: {
      lineEnd: Style.LineEnd.Round,
      lineJoin: Style.LineJoin.Round,
    },
  },
};

var makeBarChart = context => {
  const selection = context.selection.firstObject() || context.document.currentPage();

  const alert = COSAlertWindow.alloc().init();
  alert.setMessageText('Make Bar Chart');
  alert.addTextLabelWithValue('width');
  alert.addTextFieldWithValue('');
  alert.viewAtIndex(1).placeholderString = `${defaultValues.width}`;
  alert.addTextLabelWithValue('height');
  alert.addTextFieldWithValue('');
  alert.viewAtIndex(3).placeholderString = `${defaultValues.height}`;
  alert.addTextLabelWithValue('max value');
  alert.addTextFieldWithValue('');
  alert.viewAtIndex(5).placeholderString = 'Default to highest value';
  alert.addTextLabelWithValue('values (divided by ,)');
  alert.addTextFieldWithValue('');
  alert.viewAtIndex(7).placeholderString = 'Required';
  alert.addTextLabelWithValue('column width');
  alert.addTextFieldWithValue('');
  alert.viewAtIndex(9).placeholderString = 'Default to half width';
  alert.addButtonWithTitle('OK');
  alert.addButtonWithTitle('Cancel');
  alert.alert().window().initialFirstResponder = alert.viewAtIndex(1);
  alert.viewAtIndex(1).setNextKeyView(alert.viewAtIndex(3));
  alert.viewAtIndex(3).setNextKeyView(alert.viewAtIndex(5));
  alert.viewAtIndex(5).setNextKeyView(alert.viewAtIndex(7));
  alert.viewAtIndex(7).setNextKeyView(alert.viewAtIndex(9));
  alert.viewAtIndex(9).setNextKeyView(alert.viewAtIndex(1));

  const process = () => {
    const width = alert.viewAtIndex(1).doubleValue() || defaultValues.width;
    const height = alert.viewAtIndex(3).doubleValue() || defaultValues.height;
    let max = alert.viewAtIndex(5).doubleValue();
    const values = alert.viewAtIndex(7).stringValue().split(',').map(v => parseFloat(v)).filter(v => !isNaN(v));
    let columnWidth = alert.viewAtIndex(9).doubleValue();
    const count = values.length;

    if (values.length === 0) {
      showValueError();
      alert.buttons()[1].resignFirstResponder();
      if (alert.runModal() === NSAlertFirstButtonReturn) {
        process();
      }
      return;
    }
    if (max === 0) {
      max = Math.max(...values);
    }
    if (columnWidth <= 0) {
      columnWidth = width / (count * 2);
    }

    const group = new Group({
      name: 'Chart',
      parent: selection,
      frame: new Rectangle(0, 0, width, height),
    });
    new ShapePath({
      name: 'Bounding Rect',
      parent: group,
      frame: new Rectangle(0, 0, width, height),
      style: style.boundingRect,
      shapeType: ShapePath.ShapeType.Rectangle,
    });
    const shape = new Shape({
      name: 'Bars',
      parent: group,
      frame: new Rectangle(0, 0, width, height),
      style: style.shape,
    });
    for (let i = count; i >= 0; i--) {
      const x = width / count * i + (width / count - columnWidth) * 0.5;
      const y = (max - values[i]) / max * height;
      const w = columnWidth;
      const h = height - y;

      new ShapePath({
        name: 'Bar',
        parent: shape,
        frame: new Rectangle(x, y, w, h),
        style: style.shape,
        shapeType: ShapePath.ShapeType.Rectangle,
      });
    };
    shape.layers.shift(); // remove default path
  };

  if (alert.runModal() === NSAlertFirstButtonReturn) {
    process();
  }
};

var makeLineChart = context => {
  const selection = context.selection.firstObject() || context.document.currentPage();

  const alert = COSAlertWindow.alloc().init();
  alert.setMessageText('Make Line Chart');
  alert.addTextLabelWithValue('width');
  alert.addTextFieldWithValue('');
  alert.viewAtIndex(1).placeholderString = `${defaultValues.width}`;
  alert.addTextLabelWithValue('height');
  alert.addTextFieldWithValue('');
  alert.viewAtIndex(3).placeholderString = `${defaultValues.height}`;
  alert.addTextLabelWithValue('max value');
  alert.addTextFieldWithValue('');
  alert.viewAtIndex(5).placeholderString = 'Default to highest value';
  alert.addTextLabelWithValue('values (divided by ,)');
  alert.addTextFieldWithValue('');
  alert.viewAtIndex(7).placeholderString = 'Required';
  alert.addButtonWithTitle('OK');
  alert.addButtonWithTitle('Cancel');
  alert.alert().window().initialFirstResponder = alert.viewAtIndex(1);
  alert.viewAtIndex(1).setNextKeyView(alert.viewAtIndex(3));
  alert.viewAtIndex(3).setNextKeyView(alert.viewAtIndex(5));
  alert.viewAtIndex(5).setNextKeyView(alert.viewAtIndex(7));
  alert.viewAtIndex(7).setNextKeyView(alert.viewAtIndex(1));
  
  const process = () => {
    const width = alert.viewAtIndex(1).doubleValue() || defaultValues.width;
    const height = alert.viewAtIndex(3).doubleValue() || defaultValues.height;
    let max = alert.viewAtIndex(5).doubleValue();
    const values = alert.viewAtIndex(7).stringValue().split(',').map(v => parseFloat(v)).filter(v => !isNaN(v));
    const count = values.length;

    if (values.length === 0) {
      showValueError();
      alert.buttons()[1].resignFirstResponder();
      if (alert.runModal() === NSAlertFirstButtonReturn) {
        process();
      }
      return;
    }
    if (max === 0) {
      max = Math.max(...values);
    }

    const points = values.map((v, i) => {
      return {
        point: {
          x: width / (count - 1) * i / width,
          y: (max - v) / max * height / height,
        },
      };
    });

    const group = new Group({
      name: 'Chart',
      parent: selection,
      frame: new Rectangle(0, 0, width, height),
    });
    new ShapePath({
      name: 'Bounding Rect',
      parent: group,
      frame: new Rectangle(0, 0, width, height),
      style: style.boundingRect,
      shapeType: ShapePath.ShapeType.Rectangle,
    });
    new ShapePath({
      name: 'Line',
      parent: group,
      frame: new Rectangle(0, 0, width, height),
      style: style.line,
      shapeType: ShapePath.ShapeType.Custom,
      points,
      closed: false,
    });
  };

  if (alert.runModal() === NSAlertFirstButtonReturn) {
    process();
  }
};

var makeFilledLineChart = context => {
  const selection = context.selection.firstObject() || context.document.currentPage();

  const alert = COSAlertWindow.alloc().init();
  alert.setMessageText('Make Filled Line Chart');
  alert.addTextLabelWithValue('width');
  alert.addTextFieldWithValue('');
  alert.viewAtIndex(1).placeholderString = `${defaultValues.width}`;
  alert.addTextLabelWithValue('height');
  alert.addTextFieldWithValue('');
  alert.viewAtIndex(3).placeholderString = `${defaultValues.height}`;
  alert.addTextLabelWithValue('max value');
  alert.addTextFieldWithValue('');
  alert.viewAtIndex(5).placeholderString = 'Default to highest value';
  alert.addTextLabelWithValue('values (divided by ,)');
  alert.addTextFieldWithValue('');
  alert.viewAtIndex(7).placeholderString = 'Required';
  alert.addButtonWithTitle('OK');
  alert.addButtonWithTitle('Cancel');
  alert.alert().window().initialFirstResponder = alert.viewAtIndex(1);
  alert.viewAtIndex(1).setNextKeyView(alert.viewAtIndex(3));
  alert.viewAtIndex(3).setNextKeyView(alert.viewAtIndex(5));
  alert.viewAtIndex(5).setNextKeyView(alert.viewAtIndex(7));
  alert.viewAtIndex(7).setNextKeyView(alert.viewAtIndex(1));
  
  const process = () => {
    const width = alert.viewAtIndex(1).doubleValue() || defaultValues.width;
    const height = alert.viewAtIndex(3).doubleValue() || defaultValues.height;
    let max = alert.viewAtIndex(5).doubleValue();
    const values = alert.viewAtIndex(7).stringValue().split(',').map(v => parseFloat(v)).filter(v => !isNaN(v));
    const count = values.length;

    if (values.length === 0) {
      showValueError();
      alert.buttons()[1].resignFirstResponder();
      if (alert.runModal() === NSAlertFirstButtonReturn) {
        process();
      }
      return;
    }
    if (max === 0) {
      max = Math.max(...values);
    }

    const points = values.map((v, i) => {
      return {
        point: {
          x: width / (count - 1) * i / width,
          y: (max - v) / max * height / height,
        },
      };
    });
    points.push(
      { point: { x: 1, y: 1 } },
      { point: { x: 0, y: 1 } }
    );

    const group = new Group({
      name: 'Chart',
      parent: selection,
      frame: new Rectangle(0, 0, width, height),
    });
    new ShapePath({
      name: 'Bounding Rect',
      parent: group,
      frame: new Rectangle(0, 0, width, height),
      style: style.boundingRect,
      shapeType: ShapePath.ShapeType.Rectangle,
    });
    new ShapePath({
      name: 'Filled Line',
      parent: group,
      frame: new Rectangle(0, 0, width, height),
      style: style.shape,
      shapeType: ShapePath.ShapeType.Custom,
      points,
      closed: true,
    });
  };

  if (alert.runModal() === NSAlertFirstButtonReturn) {
    process();
  }
};
