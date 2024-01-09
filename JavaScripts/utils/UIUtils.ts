export module UIHelper {


    const WidgetCopyProperties = [
        'visibility',
        'enable',
        'renderTransformAngle',
        'renderTransformPivot',
        'renderShear',
        'renderScale',
        'renderOpacity',
        'constraints',
        'size',
        'autoSizeEnable',
        'position',
        'name'

    ]

    const TextCopyProperties = [
        'glyph',
        'strikethroughEnable',
        'underlineEnable',
        'contentColor',
        'shadowColor',
        'textAlign',
        'textVerticalAlign',
        'outlineColor',
        'outlineSize',
        'lineHeightPercentage',
        'fontColor',
        'textJustification',
        'textVerticalJustification',
        'textHorizontalLayout',
        'fontSize',
        'fontLetterSpace',
        'text',
    ];

    const InputCopyProperties = [
        'readOnlyEnable',
        'hintString',
        'inputTextLimit',
        'autoWrap',
        'textLengthLimit',
        'errorText'
    ].concat(TextCopyProperties);

    const ButtonCopyProperties = [

        'focusable',
        'normalImageSize',
        'normalImageColor',
        'normalImageDrawType',
        'normalImageMargin',
        'transitionEnable',
        'pressedImageSize',
        'pressedImageColor',
        'pressedImageDrawType',
        'pressedImageMargin',
        'disableImageSize',
        'disableImageColor',
        'disableImageDrawType',
        'disableImageMargin',
        'normalImageGuid',
        'pressedImageGuid',
        'disableImageGuid',
        'clickMethod',
        'touchMethod',
        'pressedMethod'

    ]

    const CanvasCopyProperties = [
        'clipEnable',
        'autoLayoutEnable',
        'autoLayoutContainerRule',
        'autoLayoutSpacing',
        'autoLayoutPacketRule',
        'autoLayoutPadding',
        'autoLayoutRule',
        'autoLayoutHugContent'
    ]

    const ImageCopyProperties = [
        'margin',
        'imageSize',
        'imageDrawType',
        'imageGuid',
        'imageColor'
    ]

    const copyProperty = {
        'Canvas': CanvasCopyProperties,
        'TextBlock': TextCopyProperties,
        "InputBox": InputCopyProperties,
        "Button": ButtonCopyProperties,
        "Image": ImageCopyProperties
    }
    export function clone<T extends mw.Widget>(source: T): T {
        const newObject: T = (source.constructor as any).newObject();
        if (source instanceof mw.PanelWidget && newObject instanceof mw.PanelWidget) {
            const childCount = source.getChildrenCount();

            for (let i = 0; i < childCount; i++) {
                const p = source.getChildAt(i);
                if (!p) {
                    continue;
                }
                const child = clone(p)
                newObject.addChild(child);
            }
        }

        for (const property of WidgetCopyProperties) {
            newObject[property] = source[property];
        }
        const uniqueProperty = copyProperty[source.constructor.name];
        if (!uniqueProperty) {
            console.error("暂不支持克隆的UI组件:" + source.constructor.name);
        } else {
            for (const property of uniqueProperty) {
                newObject[property] = source[property];
            }
        }
        return newObject;
    }

}