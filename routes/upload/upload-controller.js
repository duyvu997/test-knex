const uploadToS3 = require('../../common/upload-s3');

const upload = async (req, res) => {
  const { tags = 'notag' } = req.body || {};
  const { file } = req.files || {};
  console.log(req)
  console.log(file)

  if (!file) {
    return res.status(400).send(
      {ok: false, message: "missing file"}
    )
  }

  const result = await uploadToS3(file, tags, false);

  return res
    .status(201)
    .send({ ok: true, message: 'created', data: result });
};

const uploadBase64 = async (req, res) => {
  const { tags = 'notag', imageBase64 } = req.body || {};

  if (!imageBase64) {
    return res.status(400).send(
      {ok: false, message: "missing image with base64 format"}
    )
  }

  const result = await uploadToS3(imageBase64, tags, true);

  return res
    .status(201)
    .send({ ok: true, message: 'created', data: result });
};

module.exports = { upload, uploadBase64 };
