
var onRun = function(context){
    var doc = context.document;
    var command = context.command;
    var identifier = [command identifier];
    var resourcesPath = [[[command pluginBundle] url] path];

    if (!NSClassFromString(@"SketchI18NPluginManager")) {
        var mocha = [Mocha sharedRuntime];
        [mocha loadFrameworkWithName:@"SketchI18NPlugin" inDirectory:resourcesPath + "/Contents/Resources"];
    }

    var manager = [SketchI18NPluginManager manager];
    [manager run];
}
