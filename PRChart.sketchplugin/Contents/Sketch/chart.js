var makeBarChart = function(context) {
    var dialog
    var createUI = function() {
        dialog = COSAlertWindow.new()
        dialog.setMessageText('Make Bar Chart')
        dialog.addTextLabelWithValue('width')
        dialog.addTextFieldWithValue('600')
        dialog.addTextLabelWithValue('height')
        dialog.addTextFieldWithValue('200')
        dialog.addTextLabelWithValue('max value')
        dialog.addTextFieldWithValue('100')
        dialog.addTextLabelWithValue('values (divided by ",")')
        dialog.addTextFieldWithValue('')
        dialog.addTextLabelWithValue('column width (optional)')
        dialog.addTextFieldWithValue('')
        dialog.addButtonWithTitle('OK')
        dialog.addButtonWithTitle('Cancel')
        
        dialog.alert().window().setInitialFirstResponder(dialog.viewAtIndex(1))
        dialog.viewAtIndex(1).setNextKeyView(dialog.viewAtIndex(3))
        dialog.viewAtIndex(3).setNextKeyView(dialog.viewAtIndex(5))
        dialog.viewAtIndex(5).setNextKeyView(dialog.viewAtIndex(7))
        dialog.viewAtIndex(7).setNextKeyView(dialog.viewAtIndex(9))
        dialog.viewAtIndex(9).setNextKeyView(dialog.viewAtIndex(1))
        
        return dialog.runModal()
    }
    var process = function() {
        var width = dialog.viewAtIndex(1).stringValue()
        var height = dialog.viewAtIndex(3).stringValue()
        var max = dialog.viewAtIndex(5).stringValue()
        var values = dialog.viewAtIndex(7).stringValue().split(',')
        var columnWidth = dialog.viewAtIndex(9).stringValue()
        var count = values.length
        
        if (width.length() == 0 ||
            height.length() == 0 ||
            max.length() == 0 ||
            values.length == 0) {
            return
        }
        if (columnWidth == 0 ||
            columnWidth.length() == 0) {
            columnWidth = width / count
        }
        
        for (var i = 0; i < count; i++) {
            var x = width / count * i + (width / count - columnWidth) * 0.5
            var y = (max - values[i]) / max * height
            var w = columnWidth
            var h = height - y
        
            var sketch = context.api()
            var rect = MSShapeGroup.shapeWithRect(new sketch.Rectangle(x,y,w,h).asCGRect())
            var fill = rect.style().addStylePartOfType(0)
            fill.setColor(MSImmutableColor.colorWithIntegerRed_green_blue_alpha(0,0,0,51).newMutableCounterpart())
            rect.setName('Bar')
            context.selection[0].addLayers([rect])
        }
    }
    if (createUI() == 1000) {
        process()
    }
}

var makeLineChart = function(context) {
    var dialog
    var createUI = function() {
        dialog = COSAlertWindow.new()
        dialog.setMessageText('Make Line Chart')
        dialog.addTextLabelWithValue('width')
        dialog.addTextFieldWithValue('600')
        dialog.addTextLabelWithValue('height')
        dialog.addTextFieldWithValue('200')
        dialog.addTextLabelWithValue('max value')
        dialog.addTextFieldWithValue('100')
        dialog.addTextLabelWithValue('values (divided by ",")')
        dialog.addTextFieldWithValue('')
        dialog.addButtonWithTitle('OK')
        dialog.addButtonWithTitle('Cancel')
        
        dialog.alert().window().setInitialFirstResponder(dialog.viewAtIndex(1))
        dialog.viewAtIndex(1).setNextKeyView(dialog.viewAtIndex(3))
        dialog.viewAtIndex(3).setNextKeyView(dialog.viewAtIndex(5))
        dialog.viewAtIndex(5).setNextKeyView(dialog.viewAtIndex(7))
        dialog.viewAtIndex(7).setNextKeyView(dialog.viewAtIndex(1))
        
        return dialog.runModal()
    }
    var process = function() {
        var width = dialog.viewAtIndex(1).stringValue()
        var height = dialog.viewAtIndex(3).stringValue()
        var max = dialog.viewAtIndex(5).stringValue()
        var values = dialog.viewAtIndex(7).stringValue().split(',')
        var count = values.length
        
        if (width.length() == 0 ||
            height.length() == 0 ||
            max.length() == 0 ||
            values.length == 0) {
            return
        }
        
        var linePath = NSBezierPath.bezierPath()
        for (var i = 0; i < count; i++) {
            var x = width / (count - 1) * i
            var y = (max - values[i]) / max * height
            if (i === 0) {
                linePath.moveToPoint(NSMakePoint(x,y))
            } else {
                linePath.lineToPoint(NSMakePoint(x,y))
            }
        }
        var line = MSShapeGroup.shapeWithBezierPath(linePath)
        var border = line.style().addStylePartOfType(1)
        border.setColor(MSImmutableColor.colorWithIntegerRed_green_blue_alpha(0,0,0,51).newMutableCounterpart())
        border.setThickness(2)
        border.setPosition(0)
        line.setName('Line')
        context.selection[0].addLayers([line])
    }
    if (createUI() == 1000) {
        process()
    }
}

var makeFilledLineChart = function(context) {
    var dialog
    var createUI = function() {
        dialog = COSAlertWindow.new()
        dialog.setMessageText('Make Filled Line Chart')
        dialog.addTextLabelWithValue('width')
        dialog.addTextFieldWithValue('600')
        dialog.addTextLabelWithValue('height')
        dialog.addTextFieldWithValue('200')
        dialog.addTextLabelWithValue('max value')
        dialog.addTextFieldWithValue('100')
        dialog.addTextLabelWithValue('values (divided by ",")')
        dialog.addTextFieldWithValue('')
        dialog.addButtonWithTitle('OK')
        dialog.addButtonWithTitle('Cancel')
        
        dialog.alert().window().setInitialFirstResponder(dialog.viewAtIndex(1))
        dialog.viewAtIndex(1).setNextKeyView(dialog.viewAtIndex(3))
        dialog.viewAtIndex(3).setNextKeyView(dialog.viewAtIndex(5))
        dialog.viewAtIndex(5).setNextKeyView(dialog.viewAtIndex(7))
        dialog.viewAtIndex(7).setNextKeyView(dialog.viewAtIndex(1))
        
        return dialog.runModal()
    }
    var process = function() {
        var width = dialog.viewAtIndex(1).stringValue()
        var height = dialog.viewAtIndex(3).stringValue()
        var max = dialog.viewAtIndex(5).stringValue()
        var values = dialog.viewAtIndex(7).stringValue().split(',')
        var count = values.length
        
        if (width.length() == 0 ||
            height.length() == 0 ||
            max.length() == 0 ||
            values.length == 0) {
            return
        }
        
        var linePath = NSBezierPath.bezierPath()
        for (var i = 0; i < count; i++) {
            var x = width / (count - 1) * i
            var y = (max - values[i]) / max * height
            if (i === 0) {
                linePath.moveToPoint(NSMakePoint(x,y))
            } else {
                linePath.lineToPoint(NSMakePoint(x,y))
            }
        }
        linePath.lineToPoint(NSMakePoint(width, height))
        linePath.lineToPoint(NSMakePoint(0, height))
        linePath.closePath()
        var line = MSShapeGroup.shapeWithBezierPath(linePath)
        var fill = line.style().addStylePartOfType(0)
        fill.setColor(MSImmutableColor.colorWithIntegerRed_green_blue_alpha(0,0,0,51).newMutableCounterpart())
        line.setName('Line')
        context.selection[0].addLayers([line])
    }
    if (createUI() == 1000) {
        process()
    }
}
