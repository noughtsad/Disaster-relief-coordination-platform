export async function createNgo(req, res) {
    try {
        const { ngoName, ngoLatitude, ngoLongitude, ngoContact } = req.body;
        if (!ngoName || !ngoLatitude || !ngoLongitude || !ngoContact) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newNgo = new Ngo({ ngoName, ngoLatitude, ngoLongitude, ngoContact });
        await newNgo.save();
        res.status(201).json(newNgo);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}
export async function getNgo(req, res) {
    try {
        const ngo = await Ngo.findById(req.params.id);
        if (!ngo) {
            return res.status(404).json({ message: "NGO not found" });
        }
        res.status(200).json(ngo);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}
export async function updateNgo(req, res) {
    try {
        const updatedNgo = await Ngo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedNgo) {
            return res.status(404).json({ message: "NGO not found" });
        }
        res.status(200).json(updatedNgo);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}
export async function deleteNgo(req, res) {
    try {
        const deletedNgo = await Ngo.findByIdAndDelete(req.params.id);
        if (!deletedNgo) {
            return res.status(404).json({ message: "NGO not found" });
        }
        res.status(200).json({ message: "NGO deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}