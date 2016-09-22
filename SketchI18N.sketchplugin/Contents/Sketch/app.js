var onRun = function(context) {
    var manager,
        languagePath,
        doc = context.document,
        command = context.command,
        identifier = command.identifier(),
        resourcesPath = command.pluginBundle().url().path(),
        language = NSUserDefaults.standardUserDefaults().objectForKey("AppleLanguages").objectAtIndex(0);

    for(;;){
        languagePath = resourcesPath + "/Contents/Resources/i18n/" + language + ".json";
        if (NSFileManager.defaultManager().fileExistsAtPath(languagePath)) {
            break;
        }
        else {
            var index = language.lastIndexOf("-");
            if (index == -1) {
                return;
            }
            language = language.substring(0, index);
        }
    }

    if (!NSClassFromString("SketchI18NPluginManager")) {
        var mocha = Mocha.sharedRuntime();
        mocha.loadFrameworkWithName_inDirectory("SketchI18NPlugin", resourcesPath + "/Contents/Resources");
        manager = SketchI18NPluginManager.manager();
        var i18n = NSString.stringWithContentsOfFile_encoding_error(languagePath, NSUTF8StringEncoding, nil);
        manager.loadStrings(i18n);
    } else {
        manager = SketchI18NPluginManager.manager();
    }

    if (identifier == "i18n-toggle-command") {
        manager.toggle();
    } else {
        manager.run();
    }
}
