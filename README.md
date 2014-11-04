com.capventis.SelectionTags
===========================

This document extension for QlikView created a Qlik Sense style selection tags bar.

Before adding the document extension to your document there are a couple of additional steps:

1.  Add a variable to your document called varCurrentSelections.

2.  In the Document Properties, add a trigger to the change event of the OnInput event of varCurrentSelections:

    Action: Clear Field
    Field: =varCurrentSelections

