var onRun = function(context) {
    var manager,
        doc = context.document,
        command = context.command,
        identifier = command.identifier(),
        resourcesPath = command.pluginBundle().url().path(),
        language = NSUserDefaults.standardUserDefaults().objectForKey("AppleLanguages").objectAtIndex(0),
        languagePath = resourcesPath + "/Contents/Resources/i18n/" + language + ".json";

    if(NSFileManager.defaultManager().fileExistsAtPath(languagePath)){
        var mocha = Mocha.sharedRuntime();
        i18n = [NSString stringWithContentsOfFile:languagePath encoding:NSUTF8StringEncoding error:nil];

        if (!NSClassFromString("SketchI18NPluginManager")) {
            mocha.loadFrameworkWithName_inDirectory("SketchI18NPlugin", resourcesPath + "/Contents/Resources");
            manager = SketchI18NPluginManager.manager();
            manager.loadStrings(i18n);
        } else {
            manager = SketchI18NPluginManager.manager();
        }
        manager.run();
    }
}
